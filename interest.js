export class Interest {
  constructor({ id, name, imageUrl, description = '', isSubgenre = false }) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.isSubgenre = isSubgenre;
  }

  static fromJSON(obj) {
    if (!obj) return null;
    return new Interest({
      id: obj.id,
      name: obj.name,
      imageUrl: obj.primaryImage?.url ?? null,
      description: obj.description ?? '',
      isSubgenre: obj.isSubgenre ?? false
    });
  }
}