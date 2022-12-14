<script setup>
import { onMounted, ref } from 'vue'
import { GoogleMap, Marker, Polyline } from 'vue3-google-map'
import { useGlobalState } from '@/store'
// import Directions from './Directions.vue'
const store = useGlobalState()
const mapRef = ref(null)
const flightPlanCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
]
const flightPath = {
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
}
const markerList = ref([])
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // startPoi.value = { lat: position.coords.latitude, lng: position.coords.longitude }
                // center.value = { lat: position.coords.latitude, lng: position.coords.longitude }
                store.setCenterPoi({ lat: position.coords.latitude, lng: position.coords.longitude })
            },
            () => {
                alert('Error: The Geolocation service failed.')
            },
        )
    }
    else {
        alert('Browser doesn\'t support Geolocation')
    }
}
getLocation()
const clickMap = (e) => {
    if (markerList.value.length >= 2) {
        markerList.value = []
    }
    markerList.value.push(
        { lat: e.latLng.lat(), lng: e.latLng.lng() }
    )
    if (markerList.value.length == 1) {
        store.setCenterPoi({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
    if (markerList.value.length == 2) {
        console.log(mapRef.value.api);
        const directionsService = new mapRef.value.api.DirectionsService()
        const directionsRenderer = new mapRef.value.api.DirectionsRenderer();
        console.log(directionsRenderer);
        directionsService.route({
            origin: markerList.value[0],
            destination: markerList.value[1],
            // travelMode: google.maps.TravelMode.WALKING,
            travelMode: google.maps.TravelMode.DRIVING
        })
            .then((response) => {
                directionsRenderer.setDirections(response);
                store.setDir(response)
            })
            .catch((e) => window.alert("Directions request failed due to " + status));
    }
}
onMounted(() => {
    console.log(mapRef.value);
})
</script>
<template>
    <div class="px-6">
        <h1 class="text-center">AR Navigation</h1>
        <!-- <input type="text" v-model="startPoi"> -->
        <div class="mb-4">
            <div class="bg-green-300 p-3 inline-block" v-if="markerList[0]">
                出发：{{ markerList[0].lat }}--{{ markerList[0].lng }}
            </div>
            <div class="bg-yellow-300 p-3 inline-block ml-4" v-if="markerList[1]">
                到达：{{ markerList[1].lat }}--{{ markerList[1].lng }}
            </div>
        </div>


        <GoogleMap @click="clickMap" ref="mapRef" api-key="AIzaSyA1k0MeGsMaYh7nfJz3v47yIxr3rMtI4w4"
            style="width: 100%; height: 50vh" :center="store.centerPoi.value" :clickable-icons="false" :zoom="18">
            <Polyline :options="flightPath" />
            <Marker v-for="item in markerList" :key="item.lat" :options="{ position: item }" />
        </GoogleMap>
        <router-link v-if="markerList.length == 2" to="/vrpage">
            <button class="py-2 px-4 bg-blue-500 inline-block text-white border-0 w-60 h-10 text-lg mt-4 mx-auto">
                GO</button>
        </router-link>
    </div>
</template>