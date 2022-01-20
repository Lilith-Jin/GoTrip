import { Controller } from "stimulus"


export default class extends Controller {

  static targets = ["button"]

  addSpot() {
    // This is how we can get the params from url by JS
    const urlString = window.location.href;
    const decomposedUrl = urlString.split("/")
    // get the trip_id & day_order from the decomposed url
    const trip_id = decomposedUrl[4]
    const day_order = decomposedUrl[5]
    // Get spot id 
    const hiddenSpotIdDiv = document.querySelector(".hide-spotid-in-search")
    const spot_id = hiddenSpotIdDiv.textContent
    

    async function fetchData() {
      try {
        const csrfToken = document.querySelector("[name='csrf-token']").content
        const response = await fetch(`/api/v1/schedulespots/add?trip_id=${trip_id}&day_order=${day_order}&spot_id=${spot_id}`, {
          method: 'POST',
          headers: {
            "X-CSRF-Token": csrfToken, 
            "Content-Type": "application/json"
          },
        })  
        const result = await response.json()
        return result
      } catch {
        console.error("Something went wrong...");
      }
    }

    async function processingApiCallandAction() {

      const api_response = await fetchData()

      if ( api_response.status === "paused" ) {

        const confirmModal = document.querySelector(".hide-confirmed-message")
        confirmModal.classList.add("show-confirmed-message")

      } else if ( api_response.status === "failed" ) {

        // something went wrong
        const message = "新增失敗，我們的資料庫查無此天行程"
        const cssName = "searchMessageFailed"
        showSearchMessage(message, cssName)

      } else if ( api_response.status === "success" ) {

        // show a success message to user & redirect user back to plan page
        const message = "Good choice!此景點加入成功囉!"
        const cssName = "searchMessageSuccess"
        showSearchMessage(message, cssName)
        
        //redirecting user back to the plan page

        setTimeout(() => {
          redirectBackToPlanPage(trip_id);
        }, 1000);

      } else {

        const message = "新增失敗，伺服器似乎出了些問題，請稍後再試"
        const cssName = "searchMessageFailed"
        showSearchMessage(message, cssName)

      }


      function showSearchMessage(message, cssName) {

        const searchMessage = document.querySelector(".searchMessage")
        searchMessage.innerText = message
        searchMessage.classList.add(cssName)

      }

      function redirectBackToPlanPage(trip_id) {
        window.location.replace(`/mytrips/${trip_id}/plan`);
      }

    }

    processingApiCallandAction()


  }

}