//Checking that the users age is not greater that the wanted pension age.
export const PensionAgeCheck = (age : number | null, wantedPensionAge: number | null) => {
    const NotNullAge = age != null ? age : 0
    return wantedPensionAge != null ? wantedPensionAge < NotNullAge : false;
}