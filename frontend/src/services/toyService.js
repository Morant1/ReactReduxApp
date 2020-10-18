
import httpService from './httpService';

export const toyService = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
    let queryStr ='?';

    for (const key in filterBy) {
        queryStr += `${key}=${filterBy[key]}&`;

    }
    return httpService.get(`toy${queryStr || ''}`);
  }

  
async function getById(toyId) {
    const toy = await httpService.get(`toy/${toyId}`);
    return toy

}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`);
  }


async function save(toy) {
    if (toy._id) {
        const editedToy  = await httpService.put(`toy/${toy._id}`, toy);
        return editedToy
    } else {
        const addedToy  = await httpService.post(`toy`, toy);
        return addedToy
    }
}




