import Arm from './Arm.ts';


const values : Arm[] = [
    new Arm("Foam sword", 20, 60, 500, true),
    new Arm("Bow and arrow set", 30, 70, 600, false),
    new Arm("Rubber Band Gun", 40, 70, 1000, false),
    new Arm("Water gun", 40, 80, 1500, false),
    new Arm("Airgun", 50, 80, 2000, false)
]


class ArmContainer {
    private static valueList: Arm[] = [];
    private static valueMap: Map<string, Arm> = new Map();
    private static defaultArm: Arm | undefined;

    static setValues() {

        values.forEach((arm) => {
            ArmContainer.valueList.push(arm);
            ArmContainer.valueMap.set(arm.getName(), arm);
            if (arm.getIsDefault()) {
                ArmContainer.defaultArm = arm;
            }

        })

    }

    static getRandomArm(): Arm | undefined {
        if (this.valueList.length > 0) {
            const index = Math.floor(Math.random() * this.valueList.length);
            return this.valueList[index];
        }
        return undefined;
    }

    static getArmByName(name: string): Arm | undefined {
        return ArmContainer.valueMap.get(name);
    }

    static getDefaultArm(): Arm | undefined {
        return this.defaultArm;
    }
}

export default ArmContainer;
