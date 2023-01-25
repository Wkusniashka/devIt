import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
    const db = SQLite.openDatabase("example.db");
    const [isLoading, setIsLoading] = useState(true);
    const [dublicateEmail, setDublicateEmail] = useState(false);
    const [logStatus, setLoginStatus] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(undefined);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, email TEXT, phone TEXT, position TEXT, skype TEXT)"
            );
        });

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const registerUser = (name, email, password, phone) => {
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT email FROM user WHERE email = ?;`,
                    [email],
                    (txObj, resultSet) => {
                        resultSet.rows.length > 0
                            ? resolve(true)
                            : resolve(false);
                    },
                    (txObj, error) => console.log(error)
                );
            });
        })
            .then((dublicate) =>
                dublicate
                    ? setDublicateEmail(true)
                    : db.transaction((tx) => {
                          tx.executeSql(
                              "INSERT INTO user (name, email, password, phone) values (?,?,?,?)",
                              [name, email, password, phone],
                              (txObj, resultSet) => {
                                  setIsRegistered(true);
                                  setTimeout(() => {
                                      setIsRegistered(false);
                                  }, 1000);
                              },
                              (txObj, error) => console.log(error)
                          );
                      })
            )
            .catch((error) => console.log(error));
        setDublicateEmail(false);
    };

    const loginUser = (email, password) => {
        setLoginStatus(true);
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM user WHERE email = ?`,
                    [email],
                    (txObj, resultSet) => {
                        if (resultSet.rows.length === 0) {
                            setLoginStatus(false);
                            reject("No email");
                            return;
                        }
                        let userPassword = resultSet.rows._array[0].password;
                        setUser(resultSet.rows._array[0]);
                        password === userPassword
                            ? setIsSignedIn(true)
                            : setLoginStatus(false);
                    },
                    (txObj, error) => console.log(error)
                );
            });
        }).catch((err) => console.log("error", err));
    };

    const updateProfile = (name, email, phone, position, skype, id) => {
        new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `UPDATE user SET name = ?, email = ?, phone = ?, position = ?, skype = ? WHERE id = ? `,
                    [name, email, phone, position, skype, id],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected === 0) {
                            reject("No such user");
                            return;
                        }
                        setUser({ name, email, phone, position, skype, id });
                    },
                    (txObj, error) => console.log(error)
                );
            });
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {isSignedIn ? (
                    <Stack.Screen name="Profile">
                        {(props) => (
                            <Profile
                                {...props}
                                currentUser={user}
                                updateUserInfo={updateProfile}
                                logOut={() => setIsSignedIn(false)}
                            />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="Login">
                            {(props) => (
                                <Login
                                    {...props}
                                    login={loginUser}
                                    passCheck={logStatus}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Register">
                            {(props) => (
                                <Register
                                    {...props}
                                    registerDB={registerUser}
                                    dublicateEmail={dublicateEmail}
                                    isRegistered={isRegistered}
                                />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

