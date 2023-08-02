import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { createContext} from "react";
import { auth } from "../auth/firebase";



export const AuthContext = createContext();

//* with custom hook
// export const useAuthCotext =() => {
//     return useContext(AuthContext)
// }


  const createUser = async (email, password, displayName) => {
    //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        //* key ve value değerleri aynı ise sadece key değerini yazabiliriz
        displayName,
      });
      // console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered successfully!");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap

  const values = { createUser };
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
  )

export default AuthContextProvider;
