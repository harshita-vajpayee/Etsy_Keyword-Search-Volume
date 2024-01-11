
# Etsy_Keyword-Search-Volume

Keyword search volume - It simply means how many times that specific keyword searched per monthly basis on etsy.com  or any website

## Table of contents

- [Introduction](#intro)
- [Problem Statement](#ps)
- [Explaination](#explaination)
- [Technology Used](#tech)


## Introduction

To create a Keyword Search Volume feature for the Etsy.com platform.

Keyword search volume - It simply means how many times that specific keyword searched per monthly basis on etsy.com 

for example - if someone searches " Ring " and like to know how much the keyword search volume for " Ring " on etsy.com then we need to show the more expected keyword search volume - it could be 10000 or 8762 or anything - this is the feature I tried to create. 

I have analysed features from "everbee.io" and tried to implement them.


## Explaination

- **Keyword Feature:** In the initial page all data is displayed(Name,Search Count,Popularity of a word).I have placed a Search input for you to search a keyword and this is displayed in the table(if the keyword contains more than a word like "red warm blankted" then show count of all "red warm blanked","red","warm","blanket").

- **Statistics:** I have displayed the top 3 words searched in a fancy way with the total counts.

- **Getting data without having endpoint:** Sales data can't be fetched directly from Etsy APIs because there is no endpoint in Etsy documentation to fetch that data.So I have created a mod.js file in which I have extracted data from the website "https://www.alura.io/" and displayed whole Table data in the console of mod.js.I can get the exact columns data from this extracted whole table. But I have not put this data in my frontend because I do not know which columns I do need and to store this much of data in my Firebase.
## Tech Stacks

- **HTML** 
- **CSS** 
- **Javascript**
- **NodeJs** 
- **Firebase**  
## Screenshots
![Home Page screenshot](![Screenshot (574)](https://github.com/harshita-vajpayee/Etsy_Keyword-Search-Volume/assets/97746035/68f5b97d-33af-4783-808c-70d6e825f080)
)
![Search page Screenshot](![Screenshot (571)](https://github.com/harshita-vajpayee/Etsy_Keyword-Search-Volume/assets/97746035/84978347-1a69-47b4-8852-225e8d59ba14)

![Statistics page screenshot]([Screenshot (573)](https://github.com/harshita-vajpayee/Etsy_Keyword-Search-Volume/assets/97746035/c4f2d915-edf1-42c0-9a94-0c775ed15c66)

Console screenshot showing extracted data from website "https://www.alura.io/"
![Console Screenshot](![Screenshot (569)](https://github.com/harshita-vajpayee/Etsy_Keyword-Search-Volume/assets/97746035/800dc2d0-ab22-43e7-910f-1231677b9cef)
)
![Console](![Screenshot (570)](https://github.com/harshita-vajpayee/Etsy_Keyword-Search-Volume/assets/97746035/6ba21564-ce23-450a-9945-7bc9773b8ab6)

