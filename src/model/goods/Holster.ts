import ArmContainer from './ArmContainer';
import Arm from './Arm';

const defaultArm = new Arm("Foam sword", 20, 60, 500, true);

class Holster {
    private armMap: Map<Arm, number>;
    private armList: Arm[];
    private armsInUse: number;
    private stringRep: string;

    constructor() {
        this.armMap = new Map<Arm, number>();
        this.armList = [];
        this.armsInUse = 0;
        this.stringRep = '';

        this.add(ArmContainer.getArmByName("Foam sword") ?? new Arm("Foam sword", 20, 60, 500, true));
    }

    public getTopGun(): Arm {
        if (this.armList.length === 0) {
            return ArmContainer.getDefaultArm() ?? defaultArm;
        } else {
            const arm = this.armList.shift() as Arm;
            const quantity = this.armMap.get(arm) ?? 1;
            this.armMap.set(arm, quantity - 1);
            return arm;
        }
    }

    public add(arm: Arm): void {
        this.armList.push(arm);

        if (!this.armMap.has(arm)) {
            this.armMap.set(arm, 1);
        } else {
            const quantity = this.armMap.get(arm) ?? 0;
            this.armMap.set(arm, quantity + 1);
        }

        this.armList.sort((a, b) => {
            const harmA = a.getHarm() * a.getAccuracy();
            const harmB = b.getHarm() * b.getAccuracy();
            return harmB - harmA;
        });
    }

    /*     public printTopGuns(): string {
            const stringBuilder: string[] = [];
            const differentArms: Arm[] = [];
    
            for (const arm of this.armList) {
                if (!differentArms.includes(arm)) {
                    differentArms.push(arm);
                }
                if (differentArms.length >= 3) {
                    break;
                }
            }
    
            for (let i = 0; i < differentArms.length; i++) {
                stringBuilder.push(
                    `${TextContainer.getGeneralTexts('holsterArmString')} ${DisplaySymbols.GUN.toString()} ${differentArms[i].getName()
                    } ${this.armMap.get(differentArms[i])} ${DisplaySymbols.HARM.toString()} ${differentArms[i].getHarm()} ${DisplaySymbols.ACCURACY.toString()
                    } ${differentArms[i].getAccuracy()}`
                );
                if (i < differentArms.length - 1) {
                    stringBuilder.push('\n');
                }
            }
    
            return stringBuilder.join('\n');
        } */

    public getArmList(): Arm[] {
        return this.armList;
    }

    public clear(): void {
        this.armMap.clear();
        this.armList = [];
    }
}

/* enum DisplaySymbols {
    GUN = '🔫',
    HARM = '💥',
    ACCURACY = '🎯',
}
 */
export default Holster;