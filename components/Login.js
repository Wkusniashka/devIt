import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";

export default function Login({ navigation, login, passCheck }) {
    const [visible, setVisibility] = useState(false);

    useEffect(() => {
        if (!passCheck) {
            setError("password", {
                type: "custom",
                message: "The email address or password is incorrect",
            });
        }
    }, [passCheck]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const icon = visible ? "ios-eye-off" : "ios-eye";

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsReg: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    const loginUser = () => {
        login(email, password);
    };

    const onSubmit = (data) => {
        login(data.email, data.password);
    };
    
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            extraScrollHeight={20}
        >
            <Image
                source={require("../assets/img/Logo.png")}
                alt="logo"
                style={styles.logo}
            />
            <Text style={styles.titleText}>Log In To Woorkroom</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formName}>Your Email</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "This is required",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                        />
                    )}
                    name="email"
                />
                {errors?.email && (
                    <Text style={styles.error}>
                        {errors?.email?.message || "Error"}
                    </Text>
                )}
                <Text style={styles.formName}>Password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "This is required",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.passContainer}>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!visible}
                                textContentType="oneTimeCode"
                            />
                            <TouchableOpacity
                                style={styles.viewIcon}
                                onPress={() => setVisibility(!visible)}
                            >
                                <Icon name={icon} color={"#5E6272"} size={16} />
                            </TouchableOpacity>
                        </View>
                    )}
                    name="password"
                />
                {errors?.password && (
                    <Text style={styles.error}>
                        {errors?.password?.message || "Error"}
                    </Text>
                )}
                <TouchableOpacity>
                    <Text style={styles.forgotPassTxt}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.logInContainer}>
                    <Text style={styles.accountTxt}>New User? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    >
                        <Text style={styles.logInTxt}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    logo: {
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 110,
    },
    logError: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
    },
    titleText: {
        fontFamily: "Poppins",
        fontSize: 24,
        lineHeight: 36,
        textAlign: "center",
    },
    formContainer: {
        marginLeft: 32,
        marginRight: 31,
        marginTop: 10,
    },
    formName: {
        fontFamily: "Poppins",
        fontSize: 14,
        lineHeight: 21,
        color: "#9795A4",
        marginBottom: 15,
        marginTop: 40,
    },
    input: {
        borderBottomColor: "#D7D7D7",
        borderBottomWidth: 1,
        fontFamily: "Poppins",
        fontSize: 16,
        paddingBottom: 12,
        width: "100%",
    },
    error: {
        color: "red",
        fontFamily: "PoppinsReg",
    },
    viewIcon: {
        backgroundColor: "#e3e3e3",
        height: 24,
        width: 24,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        right: 30,
    },
    passContainer: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#FFC612",
        height: 62,
        borderRadius: 20,
        marginTop: 50,
        marginBottom: 35,
        justifyContent: "center",
    },
    btnText: {
        fontFamily: "Poppins",
        fontSize: 18,
        textAlign: "center",
    },
    logInContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 70,
    },
    accountTxt: {
        color: "#9795A4",
        fontFamily: "PoppinsReg",
    },
    logInTxt: {
        fontFamily: "Poppins",
        color: "#FFC612",
    },
    forgotPassTxt: {
        fontFamily: "PoppinsReg",
        fontSize: 14,
        color: "#9795A4",
        alignSelf: "flex-end",
        marginTop: 20,
    },
});
