import { Controller } from "stimulus"

export default class extends Controller {

    static targets = ["button"]

    connect() {
        console.log("Heyayayaya");
    }

    showInviteCard() {
        // click invite button to get tripID
        const tripID = this.buttonTarget.dataset.tripid
        const userSearchBox = document.querySelector("#searchsection")
        const hiddenTripId = document.createElement("div")
        //hide tripID with CSS visibility: hidden
        hiddenTripId.innerText = tripID
        hiddenTripId.classList.add("hide-trip-id")
        userSearchBox.appendChild(hiddenTripId)
        //show search-email field  with CSS visibility: visible
        userSearchBox.classList.add("show-search-section")

    }
    

}