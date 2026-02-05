import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
   const options = { //object for fetch
    method: "POST", 
    headers:{
      "Content-Type":"application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-4o-mini", //required parameters
      messages: [{
        role:"user",
        content: message
      }]
    })
  };
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    //console.log(data);
    return data.choices[0].message.content; //reply
  } catch(err){
     console.log(err);
  }
}

export default getOpenAIAPIResponse;