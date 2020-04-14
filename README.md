# RNExpo-Paypal-integration
Paypal integration with expo ReactNative


## Installation :

  ```bash
  npm i rn-expo-paypal-integration
  ```
  or
  ```bash
  yarn add rn-expo-paypal-integration
  ```
  
## Usage :
Before using this package please make sure your props are valid and all the required info are filled up in paypal.html inside package folder

```javascript

   <PayPal 
          amount={20}//i.e $20 
          orderID={<orderId(string)>} //transactionID
          ProductionClientID={<ProductionClientID(string)>}
          success={(a)=>{
                //callback after payment has been successfully compleated
                console.log(a)
          }} 
          failed={(a)=>{
                 //callback if payment is failed
          }}
          />
```

## Props

  * amount             : Total amount that is payed through paypal.                      (Required)-(STRING OR NUMBER)
  * orderID            : Unique TransactionID.                                           (Required)-(STRING)
  * ProductionClientID : Unique identification that is obtained from paypal dev account  (Required)-(STRING)
  * success            : Callback that is fired after transaction has been Successful.   (Optional)-(FUNCTION)
  * failed             : Callback that is fired if transaction has is failed.            (Optional)-(FUNCTION)
   
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
