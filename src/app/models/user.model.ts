export class User {
    public name: string;
    public birthday: Date;
    public photo: string;

    constructor(name: string, birthday: Date, photo: string) {
        this.name = name;
        this.birthday = birthday;
        this.photo = photo;
    }
}