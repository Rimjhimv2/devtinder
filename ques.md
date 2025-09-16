q1) what is redux?

ans:Redux ek state management library hai jo mainly React apps ke sath use hoti hai.
Matlab Redux tumhari application ka data (state) ek central jagah pe store karta hai aur usko sab components ke sath share karna easy banata hai.

q2) if redux not used?

ans:Problem Without Redux
React me by default state ek component ke andar hoti hai.
Agar ek component ka data dusre component ko chahiye, to tumhe props drilling karni padti hai (data ko parent → child → child pass karna).

q3)what is slice

ans:state + reducers + actions ka bundle.

q4) what is state,action,reducer?

ans:current snapshot of data.
Action = An object that describes what you want to do with the state
Reducer = A function that actually updates the state based on action

q5) what is axios

ans:Axios ek JavaScript library hai jo HTTP requests karne ke liye use hoti hai.
HTTP request ka matlab: tum apne frontend (React, Angular, Vue, etc.) se backend server (Express, Django, etc.) ya kisi external API (Weather API, YouTube API, etc.) se baat kar rahe ho.
Ye browser aur Node.js dono me chalti hai.

q5)benefit of axios

ans:// Fetch
fetch("http://localhost:7777/feed")
  .then(res => res.json())
  .then(data => console.log(data));


// Axios
const res = await axios.get("http://localhost:7777/feed");
console.log(res.data);

q6)benefits of axios

#Automatic JSON conversion
Fetch me tumhe res.json() likhna padta hai.
Axios me ye kaam automatically ho jata hai.

#Error Handling
Axios me error handling easy hai (try...catch).
Fetch me manually check karna padta hai res.ok.

q7) what is this ?
ans:const Feed = () => {
Ye ek React functional component Feed bana raha hai.
Iske andar hum UI aur logic likhte hain.

q7)what is asynchronous func?
ans:synchronous ka matlab: ye function promise return karega aur hum await use kar sakte hain.

q8)
ans:const res = await axios.get(BASE_URL + "/feed");
Ye line backend pe ek GET request bhejti hai.
Example: agar BASE_URL = http://localhost:7777 hai, toh ye request banegi:
res ke andar backend ka response aayega (for example: posts, feeds, etc.)





