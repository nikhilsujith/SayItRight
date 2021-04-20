import { Auth } from 'aws-amplify';

export async function logout() {
    try {
        await Auth.signOut();
        alert("Logged Out");
    } catch (error) {
        alert("There was an error while trying to logout. Please try again")
        //console.log('error signing out: ', error);
    }
}