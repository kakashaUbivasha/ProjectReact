import {makeAutoObservable} from "mobx";
import axios from "axios";
export default class allInfo{
constructor() {
    // this.ws = null
    this.status = true
    this.token = {}
    this.currentUser = {}
    this.userCollections = []
    // this.comments = []
    makeAutoObservable(this);
}
    setCurrentUsers(data){
    this.currentUser = data
    }
    setStatus(data){
    this.status = data
    }
    setUserCollections(data){
    this.userCollections = data
    }
    // setComments(data){
    // this.comments = data
    // }
    get getUserStatus(){
    return this.status
    }
    get getCurrentUser(){
    return this.currentUser
    }
    get getUserCollections(){
    return this.userCollections
    }
    // get Comments(){
    // return this.comments
    // }
    async loadCurrentUser(){
        const  response = await axios.get(`https://backforprojectreact-1.onrender.com/api/users/me`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setCurrentUsers(response.data)
                this.setStatus(false)
                console.log(this.getUserStatus)
            })
            .catch(error => {
                this.setStatus(true)
                console.error('Ошибка при получении данных о текущем пользователе:', error);
            });
    }
    async loadUserCollections(){

    const response = await axios.get('https://backforprojectreact-1.onrender.com/api/collections/user', {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
        .then(r=>{
            this.setUserCollections(r.data)
        })

        .catch( (error) => {
        console.error('Error fetching user collections:', error);
    })
    }
}