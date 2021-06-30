import React from 'react';
import { Page, Text, View, Document, StyleSheet,Font } from '@react-pdf/renderer';
import font from '../fonts/cour.ttf'

// Font.register({family:'Courier New',src:'https://allfont.es/allfont.css?fonts=courier-new'})
Font.register({
  family: 'Courier New',
  src: font
})
// Create styles
const styles = StyleSheet.create({
  page: {
    padding:10,
    fontSize:8
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontFamily:'Courier New'
  }
});

// Create Document Component
const MyDocument = ({listProducts}) => (
  <Document>
    <Page size="A4" style={[styles.page,styles.text]}>
    <View style={{marginBottom:'3px',marginLeft:'5px'}}>
      <Text>Arque disp</Text>
    </View>
    <View style={{flexDirection:'row',marginBottom:'3px',justifyContent:'flex-start',alignContent:'flex-start'}}>
      <View style={{flexDirection:'column',flexBasis:'9%'}}>
      <Text >Cantidad</Text>
      </View>
      <View style={{flexDirection:'column',flexBasis:'9%'}}>
      <Text >Precio</Text>
      </View>
      <View style={{flexDirection:'column',flexBasis:'12%'}}>
      <Text >Pr total:</Text>
      </View>
    </View>

    {listProducts.map(element=>(
<>
<View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start'}}>
<View style={{flexDirection:'column',flexBasis:"30%"}}>
  <Text >{element.name}</Text>
</View>  
</View>

<View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start'}}>
<View style={{flexDirection:'column',flexBasis:'9%'}}>
<Text style={{textAlign:'center'}}>{element.quantity}</Text>
</View>
<View style={{flexDirection:'column',flexBasis:'9%'}}>
<Text>{(Number(element.price).toString().includes('.'))?Number(element.price).toFixed(2):Number(element.price).toFixed(1)}
</Text>
</View>
<View style={{flexDirection:'column',flexBasis:'12%'}}>
<Text >{(Number(element.quanXprice).toString().includes('.'))?Number(element.quanXprice).toFixed(2):Number(element.quanXprice).toFixed(1)}</Text>
</View>
</View>
</>

    ))}

  
  <View style={{marginTop:'5px',flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start'}}>
    <Text>.............................</Text>
  </View>

    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'flex-start'}}>
      <View style={{flexDirection:'column',flexBasis:'18%'}}>
      <Text >Total:</Text>
      </View>
      <View style={{flexDirection:'column',flexBasis:'12%'}}>
       <Text >{Number(listProducts.map(item=>item.quanXprice).reduce((acc,value)=>Number(acc)+Number(value),[])).toFixed(2)}</Text>
      </View>
    </View>

    </Page>
  </Document>
);

export default MyDocument