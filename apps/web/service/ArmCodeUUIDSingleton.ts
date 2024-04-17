export class ArmCodeUUIDSingleton {
  private static instance: ArmCodeUUIDSingleton;
  private codeUUIDMap: Map<string, string>;

  private constructor() {
    this.codeUUIDMap = new Map<string, string>();
  }

  public static getInstance(): ArmCodeUUIDSingleton {
    if (!ArmCodeUUIDSingleton.instance) {
      ArmCodeUUIDSingleton.instance = new ArmCodeUUIDSingleton();
    }
    return ArmCodeUUIDSingleton.instance;
  }

  public setUUID(id: string, uuid: string): void {
    this.codeUUIDMap.set(id, uuid);
  }

  public getUUID(id: string): string {
    return this.codeUUIDMap.get(id);
  }

  public removeUUID(id: string): void {
    this.codeUUIDMap.delete(id);
  }
}
