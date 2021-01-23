const getDate = () => {

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return this.postDate.toLocaleString('ru-RU', options);
  };

  export default getDate;