import React,{useState,useEffect} from "react"
import {ActivityIndicator,StyleSheet,Text,TextInput,View,Button,FlatList,Image} from 'react-native';
import {connect} from 'react-redux'



function Profile (props){
const mail = "Soufiane.Boubella@gmail.com"
const [Nom, setNom] = useState('')
const [Prenom, setprenom] = useState('')


   
function name(mail) {
	var element=''

for (let index = mail.indexOf('.')+1; index < mail.indexOf('@'); index++) {
	element += mail[index];	
}

setNom(element)
}
function setpre(mail) {
	var element=''
	for (let index = 0; index < mail.indexOf('.'); index++) {
		element += mail[index];	
	}
	
	setprenom(element);
}
useEffect(() => {
	
	name(mail)
	setpre(mail)
})


	return(
	<View style={styles.container} on> 
		<View style={styles.item}>
		<Image
                     source = {require("../assets/user.png")}
                    style={{width:150,height:150}}
                />

		</View>
		<View style={styles.item2}>
			<Text style={styles.Title}> {"Nom : "+props.user.email.split('@')[0].split('.')[1]} </Text>
			<Text style={styles.Title}> {"Prénom : "+props.user.email.split('@')[0].split('.')[0]} </Text>
			<Text style={styles.Title}> {"Status :"+props.user.status}</Text>
			<Text style={styles.Title}> Nombre de demande : 2</Text>
			<Text style={styles.Title}> Nombre de Bills payé : 1</Text>

		</View>
		

	</View>

		);

}


const styles=StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#ffff',
        flexDirection : 'column',
        alignItems: 'stretch',
        padding : 10
      },

	item :{
		flex:2,
		flexDirection:'column',
		alignItems:"center",
		justifyContent:"center"
	},
	item2 :{
		flex:3,
		flexDirection:'column',
		marginTop:20,
		marginLeft:10,
	},
	Title :{
        marginTop: 20,
        fontSize: 23,
        color:"#8E7D7D",
		fontWeight:'normal'
        
    },
	})

	const mapStateToProps = (state) => {
		return {
		  user: state.UserReducer.User,
		  
		}
	 }
	 

 export default connect(mapStateToProps)(Profile)