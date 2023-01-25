import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFonts } from "expo-font";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/AntDesign";

export default function Profile({ currentUser, logOut, updateUserInfo }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            phone: currentUser?.phone,
            position: currentUser?.position,
            skype: currentUser?.skype,
        },
    });
    const emailInput = useRef();

    const [loaded] = useFonts({
        Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsReg: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    const onSubmit = (data) => {
        const { name, email, phone, position, skype } = data;
        updateUserInfo(name, email, phone, position, skype, currentUser?.id);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            extraScrollHeight={20}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Edit Profile</Text>
                <TouchableOpacity
                    onPress={() => logOut()}
                    style={styles.logOutBtn}
                >
                    <Text style={styles.logOutTxt}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
                <View>
                    <Image
                        source={require("../assets/img/profilePic.png")}
                        alt="progilePic"
                        style={styles.profilePic}
                    />
                    <View style={styles.icon}>
                        <Icon name="edit" size={16} color="#5E6272" />
                    </View>
                </View>
                <Text style={styles.userName}>{currentUser?.name}</Text>
                <Text style={styles.userPosition}>{currentUser?.position}</Text>
            </View>
            <Text style={styles.formName}>Name</Text>
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
            <Text style={styles.formName}>Email</Text>
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
            <Text style={styles.formName}>Phone</Text>
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
                        keyboardType="numeric"
                    />
                )}
                name="phone"
            />
            {errors?.phone && (
                <Text style={styles.error}>
                    {errors?.phone?.message || "Error"}
                </Text>
            )}
            <Text style={styles.formName}>Position</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="position"
            />
            <Text style={styles.formName}>Skype</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize={false}
                    />
                )}
                name="skype"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingRight: 31,
        paddingLeft: 32,
    },
    headerContainer: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontFamily: "Poppins",
        fontSize: 18,
        lineHeight: 27,
    },
    profileText: {
        fontSize: 22,
        paddingBottom: 10,
    },
    logOutTxt: {
        fontFamily: "Poppins",
        color: "#FFC612",
    },
    logOutBtn: {
        position: "absolute",
        right: 0,
    },
    profileInfo: {
        marginTop: 30,
        alignItems: "center",
    },
    profilePic: {
        width: 70,
        height: 70,
    },
    icon: {
        backgroundColor: "#F3F3F3",
        borderRadius: 50,
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    userName: {
        fontFamily: "Poppins",
        fontSize: 24,
        lineHeight: 36,
        marginTop: 10,
    },
    userPosition: {
        fontFamily: "Poppins",
        fontSize: 14,
        lineHeight: 21,
        color: "#9795A4",
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
});
