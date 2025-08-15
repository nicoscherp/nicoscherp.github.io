import { Interest } from "./interest";

export class Category {
    constructor({ name, interests = [] }) {
        this.name = name;
        this.interests = interests;
    }

    static fromJSON(obj) {
        if (!obj) return null;
        const interests = Array.isArray(obj.interests) ? obj.interests.map(Interest.fromJSON).filter(Boolean) : [];
        return new Category({
            name: obj.category,
            interests
        });
    }
}