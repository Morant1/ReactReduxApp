import httpService from './httpService';


export const branchService = {
    query
}

async function query() {
    const branches = await httpService.get(`branch`);
    return branches
  }