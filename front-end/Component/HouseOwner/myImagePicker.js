import React, { useState, useEffect } from 'react';
import { Pressable, Image, View, Platform,StyleSheet,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({setImages,status}) {
   const [image1, setImage1] = useState(null)
   const [image2, setImage2] = useState(null)
   const [image3, setImage3] = useState(null)
   const [image4, setImage4] = useState(null)
   const [image5, setImage5] = useState(null)


//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

   useEffect(() => {
      setImages([image1,image2,image3,image4,image5])
      if (status === 'Submited') {
         setImage1(null);
         setImage2(null);
         setImage3(null);
         setImage4(null);
         setImage5(null);
      }
   }, [image1,image2,image3,image4,image5,status])

  const pickImage = async (imageNumber) => {

      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });
      if (!result.cancelled) {
      imageNumber == 1 && setImage1(result.uri); 
      imageNumber == 2 && setImage2(result.uri); 
      imageNumber == 3 && setImage3(result.uri); 
      imageNumber == 4 && setImage4(result.uri); 
      imageNumber == 5 && setImage5(result.uri); 
      }
  };


  return (
    <View style={styles.container}>
      <View style={[styles.picButton,{marginBottom:17}]}>
         <Pressable style={styles.mainItem} onPress={() => {pickImage(1)}}>
            <Text style={[styles.imagesLabel,{paddingHorizontal:35}]}>
               Pick the main image
            </Text>
         </Pressable>
         { image1 && <Image source={{ uri: image1 }} style={styles.mainPicDimension} />}
      </View>

      <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}>

         <View style={styles.picButton}>
            <Pressable style={styles.item}  onPress={() => {pickImage(2)}}>
               <Text style={styles.imagesLabel}>Add image</Text>
            </Pressable>
            { image2 && <Image source={{ uri: image2 }} style={styles.picDimension} />}
         </View>
         <View style={styles.picButton} >
            <Pressable style={styles.item}  onPress={() => {pickImage(3)}} >
               <Text style={styles.imagesLabel}>Add image</Text>
            </Pressable>
            { image3 && <Image source={{ uri: image3 }} style={styles.picDimension} />}
         </View>
         <View style={styles.picButton} >
            <Pressable style={styles.item}  onPress={() => {pickImage(4)}} >
               <Text style={styles.imagesLabel}>Add image</Text>
            </Pressable>
            { image4 && <Image source={{ uri: image4 }} style={styles.picDimension} />}
         </View>
         <View style={styles.picButton} >
            <Pressable style={styles.item}  onPress={() => {pickImage(5)}} >
               <Text style={styles.imagesLabel}>Add image</Text>
            </Pressable>
            { image5 && <Image source={{ uri: image5 }} style={styles.picDimension} />}
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   container:{
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:10
   },
   mainItem:{
      paddingVertical:10,
      backgroundColor: '#E4DDBE',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,

   },
   picButton:{
      marginHorizontal:2,
      backgroundColor: '#E4DDBE',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
   },
   item:{
      paddingVertical:10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width:90,
   },
   picDimension:{
      width: 90, height: 90,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
   },
   mainPicDimension:{
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width:200,
      height:200
   },
   imagesLabel:{
      textAlign:'center',
      fontSize:12,
      fontWeight:'bold'
   }
})