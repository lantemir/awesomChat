import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, Text, TouchableOpacity, View } from "react-native";
import useGlobal from "../core/global";
import * as ImagePicker from 'expo-image-picker';



function ProfileImage () {

    const handlePress = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({base64: true});
          if (!result.cancelled) {
            console.log('launchImageLibrary', result);
            const file = result.assets[0]
          } else {
            console.log('Image selection cancelled');
            return;
          }
        } catch (error) {
          console.log('Error selecting image:', error);
        }
      };

    return(
        <TouchableOpacity 
            style={{marginBottom: 20}}
            
            onPress={handlePress}
            >
            <Image 
                source={require('../assets/user.png')}
                style={{width: 180, height: 180, borderRadius: 90, backgroundColor: '#e0e0e0' }}
            />
            <View 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#202020',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: 'white'
                }}    
            >
                <FontAwesomeIcon
                    icon="pencil"
                    size={17}
                    color="#d0d0d0"
                />
            </View>
        </TouchableOpacity>
    )
}

function ProfileLogout () {

    const logout =useGlobal(state => state.logout)

    return (
        <TouchableOpacity 
        onPress={logout}
        style={{
            flexDirection: 'row',
            height: 52,
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 26,
            backgroundColor: '#202020',
            marginTop: 40
        }}>
            <FontAwesomeIcon 
                icon='right-from-bracket'
                size={20}
                color="#d0d0d0"
                style={{marginRight: 12}}
            />
            <Text style={{
                fontWeight: 'bold',
                color: '#d0d0d0'
            }}>
                Log out
            </Text>
        </TouchableOpacity>
        
    )
}


function ProfileScreen () {
    const user = useGlobal((state) => state.user)
    return(
        <View style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 100
        }}>
            <ProfileImage />
            
            <Text
                style={{
                    textAlign: 'center',
                    color: '#303030',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 6
                }}
            >
                {user.name}
            </Text>
            <Text style={{
                textAlign:'center',
                color: '#606060',
                fontSize: 14
            }}>
                @{user.username}
            </Text>

            <ProfileLogout/>
        </View>
    )
}

export default ProfileScreen;