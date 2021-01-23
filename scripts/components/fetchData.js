class FetchData {
  getResource = async url => {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error('Error ' + res.status)
    }

    return res.json(); 
  }

  getPost = () => this.getResource('db/dataBase.json');
} 

export default FetchData;