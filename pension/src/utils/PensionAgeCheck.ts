//Checking that the users age is not greater that the wanted pension age.
export const PensionAgeCheck = (birthYear : number | null, wantedPensionAge: number | null) => {
    const currentYear = new Date().getFullYear()
    const userAge = birthYear != null ? currentYear - birthYear : 0;
    return wantedPensionAge != null ? wantedPensionAge < userAge : false;
}