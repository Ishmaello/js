import { FrameworkDetector } from "../detector";
import { existsSync, readFileSync } from "fs";
import { FrameworkType } from "../../types/ProjectType";
import { parsePackageJson } from "../../../lib/utils";

export default class HardhatDetector implements FrameworkDetector {
  public frameworkType: FrameworkType = "hardhat";

  public matches(path: string): boolean {
    const packageJson = readFileSync(path + "/package.json");
    const { dependencies, devDependencies } = parsePackageJson(packageJson);

    const additionalFilesToCheck = ["/hardhat.config.js", "/contracts/"];
    const additionalFilesExist = additionalFilesToCheck.some((file) => existsSync(path + file));

    return (
      (
        dependencies["hardhat"] || 
        devDependencies["hardhat"] ||
        additionalFilesExist
      ) ||
      false
    );
  }
}
