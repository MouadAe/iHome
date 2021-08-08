import React from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native';


function OfferItem(props){
      let post=props.offer
      let imageNom=post.image1.split('.')
      let owner= post.owner.split('@')[0]
	return (
		<TouchableOpacity
			style={styles.container} 
            onPress={()=>props.showDetails(post._id.$oid)}
		> 
			<Image style={styles.offer_img}
				   source={{ uri: global.MyVar+'/images/'+imageNom[0]+'_'+post._id.$oid+'.'+imageNom[1]}} />
			<View style={styles.offer_Infos} > 
				<View style={styles.infos_header}> 
					<View>
						<Text style={styles.badge}>SUPER LODGER</Text>
					</View>
                              {props.isFavorite == true?
					<Image
					style={styles.fav}
					source={require("../images/Vector_in.png")}
					/>
                               :
                              <Image
                              style={styles.fav}
                              source={require("../images/Vector.png")} />
                         }
				</View>
				<View style={styles.infos_body}> 
					<Text style={styles.body_title}>{post.title}</Text>
				</View>
				<View style={styles.infos_footer}> 
					<Text style={styles.footer_text}> By The house Owner’s {owner} </Text>
				</View>
			</View>

		</TouchableOpacity>
		)

}

const styles= StyleSheet.create({
      container: {
      	margin: 0,
      	flexDirection: 'row',
      	marginBottom: 17
      },	
      offer_img: {
      	flex:1,
      	borderTopRightRadius: 10,
      	borderBottomRightRadius: 10,
      	marginRight: 8,
      	height: 100

      },
      offer_Infos: {
      	flex: 2
      },
      infos_header: {
      	flex: 1,
      	flexDirection: 'row',
      	justifyContent: 'space-between', 
      	paddingRight: 7

      },
      fav : {
      	width: 20,
      	height: 20
      },
      badge: {
      	color: 'white',
      	padding: 3,
      	borderRadius: 2,
      	backgroundColor: '#E0D14A',
      	fontSize: 8
      },
      infos_body: {
      	flex: 3,
      	justifyContent:  'center' 
      },
      body_title: {
      	fontSize: 16
      },
      infos_footer : {
      	flex: 1
      },
      footer_text: {
      	color: '#9C9494',
      	fontSize: 10
      }
  })

export default OfferItem