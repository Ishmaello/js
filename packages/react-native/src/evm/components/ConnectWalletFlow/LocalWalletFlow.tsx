import BaseButton from "../base/BaseButton";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ConnectWalletHeader } from "./ConnectingWallet/ConnectingWalletHeader";
import Text from "../base/Text";
import { ModalFooter } from "../base/modal/ModalFooter";
import { useState } from "react";
import {
  ConnectUIProps,
  WalletInstance,
  useCreateWalletInstance,
  useWalletContext,
} from "@thirdweb-dev/react-core";
import type { LocalConfiguredWallet } from "../../wallets/types/local-wallet";
import { LocalWalletImportModal } from "./LocalWalletImportModal";

type LocalWalletFlowUIProps = ConnectUIProps & {
  localWallet: LocalConfiguredWallet;
  onConnected?: (wallet: WalletInstance) => void;
};

export function LocalWalletFlow({
  goBack,
  close,
  localWallet,
  onConnected,
}: LocalWalletFlowUIProps) {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const { setConnectedWallet } = useWalletContext();
  const createInstance = useCreateWalletInstance();

  const onImportPress = async () => {
    setIsImportModalVisible(true);
  };

  const onImportModalClose = () => {
    setIsImportModalVisible(false);
  };

  const onConnectPressInternal = async () => {
    setIsCreatingWallet(true);

    const localWalletInstance = await createInstance(localWallet);
    connect(localWalletInstance);
  };

  const connect = async (wallet: WalletInstance) => {
    await wallet.connect();

    if (onConnected) {
      onConnected(wallet);
    } else {
      setConnectedWallet(wallet);
    }
  };

  return (
    <>
      <ConnectWalletHeader
        onBackPress={goBack}
        headerText="Guest Wallet"
        alignHeader="flex-start"
        subHeaderText={""}
        onClose={close}
      />
      <View style={styles.connectingContainer}>
        <BaseButton
          backgroundColor="white"
          minWidth={130}
          onPress={onConnectPressInternal}
          style={styles.connectWalletButton}
        >
          {isCreatingWallet ? (
            <ActivityIndicator size="small" color="buttonTextColor" />
          ) : (
            <Text variant="bodyLarge" color="black">
              Create new wallet
            </Text>
          )}
        </BaseButton>
        <Text variant="subHeader" mt="lg">
          -------- OR --------
        </Text>
        <ModalFooter footer={"Import a wallet"} onPress={onImportPress} />
      </View>

      <LocalWalletImportModal
        isVisible={isImportModalVisible}
        localWallet={localWallet}
        onWalletImported={connect}
        onClose={onImportModalClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  connectingContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    marginTop: 18,
  },
  connectWalletButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
