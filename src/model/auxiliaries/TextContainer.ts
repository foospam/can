import TextObject from './TextObject.js';


// Create a class for TextContainer
class TextContainer {
    private placeNames: string[] = [];
    private stuffNames: string[] = [];
    private textObject = TextObject;

    constructor(fileName: string) {
        this.loadFile(fileName);
    }

    private loadFile(fileName: string): void {
        this.readAllPlaceNames();
        this.readAllStuffNames();
    }

    private getScreenText(screenName: string, stringText: string): string | null {
        try {
            return this.textObject.screenTexts.get(screenName).get(stringText);
        }
        catch (error){
            return this.textObject.screenTexts.default.get(stringText);
        } 
    }

    private readAllPlaceNames(): void {
        TextObject.placeNames.map((placeName : string) => {
            this.placeNames.push(placeName);
        });
    }

    private readAllStuffNames(): void {
        TextObject.stuffNames.map((stuffName : string) => {
            this.stuffNames.push(stuffName);
        });
    }

    public getRandomPlaceName(): string | null {
        if (this.placeNames.length > 0) {
            const index = Math.floor(Math.random() * this.placeNames.length);
            const name = this.placeNames[index];
            this.placeNames.splice(index, 1);
            return name;
        }
        return null;
    }

    public getPlaceNames(): string[] {
        return this.placeNames;
    }

    public getStuffNames(): string[] {
        return this.stuffNames;
    }

    public getAllStuffCarriers(): StuffCarrier[] {
        // Implement your logic here
        return [];
    }

    public readAllArms(): Arm[] {
        // Implement your logic here
        return [];
    }

    public getBattlePrompts(string: string): string {
        // Implement your logic here
        return '';
    }

    public getGeneralTexts(string: string): string {
        // Implement your logic here
        return '';
    }
}

// Usage example
const textContainer = new TextContainer('texts.json');