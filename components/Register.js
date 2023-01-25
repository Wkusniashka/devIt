import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import Icon from "react-native-vector-icons/Ionicons";

export default function Register({ navigation, registerDB, dublicateEmail, isRegistered }) {
    const [phone, setPhone] = useState("");
    const [visible, setVisibility] = useState(false);
    const [confirmVisible, setConVisibility] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const [isFocused, setFocused] = useState(false);
    const [validPhone, setValidPhone] = useState(true);
    const code1InputRef = useRef();
    const code2InputRef = useRef();
    const code3InputRef = useRef();
    const code4InputRef = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            code1: "",
            code2: "",
            code3: "",
            code4: "",
            name: "",
            email: "",
            password: "",
            password2: "",
        },
    });

    useEffect(() => {
        if (isRegistered) {
            navigation.navigate('Login');
        }
    }, [isRegistered]);

    useEffect(() => {
        if (dublicateEmail) {
            setError("email", {
                type: "custom",
                message: "This email is already taken",
            });
            emailInput?.current?.focus();
        }
    }, [dublicateEmail]);

    const onSubmit = (data) => {
        const { name, email, password, password2 } = data;
        if (!passwordCheck(password, password2)) {
            setError("password2", {
                type: "custom",
                message: "Passwords should be identical",
            });
        }
        if (formattedValue.length === 0 || !validPhone) {
            setValidPhone(false);
        } else {
            registerDB(name, email, password, formattedValue);
        }
    };

    const icon = visible ? "ios-eye-off" : "ios-eye";
    const icon2 = confirmVisible ? "ios-eye-off" : "ios-eye";

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsReg: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    const passwordCheck = (pass1, pass2) => {
        return pass1 === pass2;
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
            <Text style={styles.titleText}>Sign Up To Woorkroom</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formName}>Phone Number</Text>
                <PhoneInput
                    defaultValue={phone}
                    defaultCode="US"
                    layout="second"
                    containerStyle={styles.phoneInputContainer}
                    textContainerStyle={styles.textContainer}
                    textInputStyle={styles.textInput}
                    codeTextStyle={styles.codeText}
                    countryPickerButtonStyle={styles.countryPickerButton}
                    onChangeText={(text) => {
                        setPhone(text);
                        setValidPhone(phoneInput.current?.isValidNumber(text));
                    }}
                    onChangeFormattedText={(text) => setFormattedValue(text)}
                    placeholder="5417543013"
                    ref={phoneInput}
                />
                {!validPhone && (
                    <Text style={styles.error}>
                        Please provide a valid number
                    </Text>
                )}
                <View>
                    <Text style={styles.formName}>Code</Text>
                    <View style={styles.codeNumbers}>
                        <Controller
                            control={control}
                            rules={{
                                required: "This is required",
                                maxLength: 1,
                                pattern: /^[0-9]*$/,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    style={[
                                        styles.codeInput,
                                        isFocused && styles.active,
                                    ]}
                                    onBlur={() => {
                                        onBlur;
                                        setFocused(false);
                                    }}
                                    onChangeText={(tx) => {
                                        onChange(tx);
                                        tx &&
                                            tx.length === 1 &&
                                            code2InputRef.current.focus();
                                    }}
                                    value={value}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setFocused(true)}
                                    ref={code1InputRef}
                                />
                            )}
                            name="code1"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: "This is required",
                                maxLength: 1,
                                pattern: /^[0-9]*$/,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    style={[
                                        styles.codeInput,
                                        isFocused && styles.active,
                                    ]}
                                    onBlur={() => {
                                        onBlur;
                                        setFocused(false);
                                    }}
                                    onChangeText={(tx) => {
                                        onChange(tx);
                                        tx &&
                                            tx.length === 1 &&
                                            code3InputRef.current.focus();
                                    }}
                                    value={value}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setFocused(true)}
                                    ref={code2InputRef}
                                />
                            )}
                            name="code2"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: "This is required",
                                maxLength: 1,
                                pattern: /^[0-9]*$/,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    style={[
                                        styles.codeInput,
                                        isFocused && styles.active,
                                    ]}
                                    onBlur={() => {
                                        onBlur;
                                        setFocused(false);
                                    }}
                                    onChangeText={(tx) => {
                                        onChange(tx);
                                        tx &&
                                            tx.length === 1 &&
                                            code4InputRef.current.focus();
                                    }}
                                    value={value}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setFocused(true)}
                                    ref={code3InputRef}
                                />
                            )}
                            name="code3"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: "This is required",
                                maxLength: 1,
                                pattern: /^[0-9]*$/,
                            }}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <TextInput
                                    style={[
                                        styles.codeInput,
                                        isFocused && styles.active,
                                    ]}
                                    onBlur={() => {
                                        onBlur;
                                        setFocused(false);
                                    }}
                                    onChangeText={onChange}
                                    value={value}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setFocused(true)}
                                    ref={code4InputRef}
                                />
                            )}
                            name="code4"
                        />
                    </View>
                    {errors?.code1 ||
                        errors?.code2 ||
                        errors?.code3 ||
                        (errors?.code4 && (
                            <Text style={styles.error}>
                                {errors?.code1?.message || "Error"}
                            </Text>
                        ))}
                </View>
                <Text style={styles.formName}>Your Name</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "This is required",
                        minLength: {
                            value: 3,
                            message: "Name should be longer than 3 symbols",
                        },
                        pattern: {
                            value: /^[A-Za-z ]+$/i,
                            message: "Name contains unsupported characters",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="name"
                />
                {errors?.name && (
                    <Text style={styles.error}>
                        {errors?.name?.message || "Error"}
                    </Text>
                )}
                <Text style={styles.formName}>Your Email</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "This is required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Please provide a valid email address",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            ref={emailInput}
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
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                            message:
                                "Password should be minimum 6 characters long, including upper case letter, lower case letter, number and special character",
                        },
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
                <Text style={styles.formName}>Confirm password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "This is required",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                            message:
                                "Password should be minimum 6 characters long, including upper case letter, lower case letter, number and special character",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.passContainer}>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!confirmVisible}
                            />
                            <TouchableOpacity
                                style={styles.viewIcon}
                                onPress={() =>
                                    setConVisibility(!confirmVisible)
                                }
                            >
                                <Icon
                                    name={icon2}
                                    color={"#5E6272"}
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    name="password2"
                />
                {errors?.password2 && (
                    <Text style={styles.error}>
                        {errors?.password2?.message || "Error"}
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
                <View style={styles.logInContainer}>
                    <Text style={styles.accountTxt}>Have Account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text style={styles.logInTxt}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    logo: {
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 110,
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
    phoneInputContainer: {
        // height: 72,
        // paddingTop: 0,
    },
    textContainer: {
        borderWidth: 1,
        borderColor: "#D7D7D7",
        borderRadius: 15,
        backgroundColor: "white",
        paddingTop: 12,
        paddingBottom: 12,
    },
    textInput: {
        fontFamily: "Poppins",
        fontSize: 16,
        lineHeight: 24,
    },
    codeText: {
        fontFamily: "Poppins",
        color: "#9795A4",
    },
    countryPickerButton: {
        borderWidth: 1,
        borderColor: "#D7D7D7",
        borderRadius: 15,
        fontFamily: "Poppins",
        color: "#9795A4",
        marginRight: 25,
        width: 65,
    },
    codeNumbers: {
        flexDirection: "row",
    },
    codeInput: {
        borderWidth: 1,
        borderColor: "#D7D7D7",
        borderRadius: 15,
        width: 48,
        height: 48,
        marginRight: 25,
        fontFamily: "Poppins",
        paddingLeft: 18,
    },
    active: {
        borderWidth: 1,
        borderColor: "#FFC612",
        borderRadius: 15,
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
});
