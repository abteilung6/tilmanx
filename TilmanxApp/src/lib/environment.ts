import Config from 'react-native-config';
import {string} from 'yup';

class EnvironmentConfigManager {
  private static _instance: EnvironmentConfigManager;

  private stringSchema = string().required();

  public readonly api_url: string;

  constructor() {
    this.api_url = this.stringSchema.validateSync(Config.API_URL);
  }

  public static getInstance(): EnvironmentConfigManager {
    if (EnvironmentConfigManager._instance == null) {
      EnvironmentConfigManager._instance = new EnvironmentConfigManager();
    }
    return this._instance;
  }
}

export const EnvironmentConfig = EnvironmentConfigManager.getInstance();
