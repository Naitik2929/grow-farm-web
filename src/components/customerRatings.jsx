import React, { useState, useEffect } from "react";
function CustomerRating (){
    const [reviews,setReviews] = useState([
        {
            "name": "Suresh",
            "message": "Smooth experience, great connectivity, addictive content. Awesome!",
        },
        {
            "name": "Shivam",
            "message": "User-friendly, fun interactions, addictive content. Impressive!\"",
        },
        {
            "name": "Jacky",
            "message": "Sleek interface, intuitive navigation, engaging features. Love it!",
        }
    ]);
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/users/feedback`
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setReviews(data.reviews);
              
            } else {
              console.error("Failed to fetch reviews");
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
    
        fetchReviews();
      }, []);
    return (
        <div class="lg:p-10 p-6 font-[sans-serif] text-green-700 bg-gray-100" id="review">
            <div class="mb-20 text-center">
                <h2 class="text-3xl font-extrabold">What our happy user say</h2>
            </div>
            <div class="grid md:grid-cols-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
                <div class="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">
                            {reviews[0].message}
                            </p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">{reviews[0].name}</h4>
                    </div>
                </div>
                <div class="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">
                        {reviews[1].message}
                            </p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">{reviews[1].name}</h4>
                    </div>
                </div>
                <div class="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">
                        { reviews[2].message}
                            </p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">{reviews[2].name}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomerRating