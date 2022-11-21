import { delay, Observable, of, tap } from "rxjs";
import type { IUser } from "./interfaces";


/** @deprecated */
class mockLoginService {
    static createLoginTokenForUser(user: IUser) {
        setTimeout(() => {
            console.log(
                "(side effect function) succesfully created a login token for  this user:",
                user
            );
        }, Math.random() * 1500);
    }
}


export class LoginService {
    loggedInUserToken: string;

    /**
     * fake login function, to demonstrate {@link tap} use case
     * @param the user {@link IUser} which we want to login and create a login token for
     * @returns the loginData {@link ILoginData} 
     */
    loginUser(user: IUser): Observable<ILoginData> {
        // simulate login http request
        const randomToken = this.generateToken();
        const loginData$ = of({ userName: user.name, token: randomToken })

        // we only want to subscribe to this observable when the "loginUser" function is called
        // but sometimes we also want to use the data from this subscription
        // to update a variable in the class itself
        // This is another use case of the tap operator: 
        // - it allows us to delay the activation of the observable 
        // - but also gives us the opportunity to setup before we subscribe
        // - it gives us the opportunity to setup before we subscribe

        return loginData$.pipe(
            // simulate POST HTTP request waiting time
            delay(Math.random() * 1500),
            // use the tap operator to update the local variable "tokenLoggedInUser"
            // before we subscribe somewhere else
            // 
            tap((loginData: ILoginData) => {
                console.log(
                    `(side effect example) created login token & stored in LoginService`
                );
                this.loggedInUserToken = loginData.token;

                // even though we try to return a string...
                return loginData.token
            }),
            // ...the next operator still receives the full loginData object
            tap(console.log)
        )
    }

    /** Don't use this token generator in real life, use JWT or something else that is more secure & useful */
    private generateToken() {
        let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let characters = [];
        for (let i = 0; i < 32; i++) {
            let j = (Math.random() * (a.length - 1)).toFixed(0);
            characters.push(a[j]);
        }
        return characters.join("");
    }
}


export interface ILoginData {
    userName: string;
    token: string;
}
