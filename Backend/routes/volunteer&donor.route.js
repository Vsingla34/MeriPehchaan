import express from 'express'
import { getVolunteers } from '../controllers/volunteer.controller.js';

const fetchRolesRoute = express.Router();

fetchRolesRoute.get('/g-v-da',getVolunteers)



export {fetchRolesRoute}