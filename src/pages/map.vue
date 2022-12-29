<script setup>
import { onMounted, ref, watch } from 'vue'
import { GoogleMap, Marker, Polyline } from 'vue3-google-map'
import { useGlobalState } from '@/store'
// import Directions from './Directions.vue'
const store = useGlobalState()
const mapRef = ref(null)

const flightPath = ref({
    path: [],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
})
const markerList = ref([])
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
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

// set route Line
const setLine = () => {
    flightPath.value = {
        path: [],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    }
    let arr = []
    const steps = store.directions.value.routes[0].legs[0].steps
    if (steps.length > 0) {
        arr.push({
            lat: steps[0].start_location.lat(), lng: steps[0].start_location.lng()
        })
    }
    steps.forEach(item => {
        arr.push({
            lat: item.end_location.lat(), lng: item.end_location.lng()
        })
    });
    flightPath.value.path = arr
}
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
        const directionsService = new mapRef.value.api.DirectionsService()
        const directionsRenderer = new mapRef.value.api.DirectionsRenderer();
        directionsService.route({
            origin: markerList.value[0],
            destination: markerList.value[1],
            // travelMode: google.maps.TravelMode.WALKING,
            travelMode: google.maps.TravelMode.DRIVING
        })
            .then((response) => {
                directionsRenderer.setDirections(response);
                store.setDir(response)


                setLine()
            })
            .catch((e) => window.alert("Directions request failed due to " + status));
    }
}
onMounted(() => {
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


        <!-- mapTypeId="satellite" -->
        <GoogleMap @click="clickMap" ref="mapRef" api-key="AIzaSyA1k0MeGsMaYh7nfJz3v47yIxr3rMtI4w4"
            style="width: 100%; height: 50vh" :center="store.centerPoi.value" :clickable-icons="false" :zoom="18">
            <Polyline v-if="flightPath.path.length > 0" :options="flightPath" />
            <Marker v-for="item in markerList" :key="item.lat" :options="{ position: item }" />
        </GoogleMap>
        <router-link v-if="markerList.length == 2" to="/vrpage">
            <button class="py-2 px-4 bg-blue-500 inline-block text-white border-0 w-60 h-10 text-lg mt-4 mx-auto">
                GO</button>
        </router-link>
    </div>
</template>