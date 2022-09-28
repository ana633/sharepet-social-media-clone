export const categories = [
    {
      name: 'cats',
      image: 'https://i.pinimg.com/564x/5a/ed/ec/5aedece8e7604a7f726fb28e439ac4ed.jpg',
    },
    {
      name: 'dogs',
      image: 'https://i.pinimg.com/474x/6a/95/83/6a958390de7924f68e1dfbd57d8c41d6.jpg',
    },
    {
      name: 'birds',
      image: 'https://i.pinimg.com/474x/f8/ba/9e/f8ba9e7bf02d93ab089d558082c5c868.jpg',
    },
    {
      name: 'rabbits',
      image: 'https://i.pinimg.com/474x/ac/92/9d/ac929d5a6b0240e96cc7caa855deca6d.jpg',
    },
    {
      name: 'turtles',
      image: 'https://i.pinimg.com/474x/b4/48/db/b448dbcd0158bdf1daefa5bdb1393a99.jpg',
    },
    {
      name: 'fish',
      image: 'https://i.pinimg.com/474x/3c/09/8b/3c098bfc700b2892d3a7e4b1552dd5e2.jpg',
    },
    {
      name: 'ducks',
      image: 'https://i.pinimg.com/474x/da/cd/89/dacd891f6dc01e875e7ab0da438adf08.jpg',
    }, {
      name: 'horses',
      image: 'https://i.pinimg.com/474x/c6/0a/b5/c60ab5d57205b9be5dce6a03ef8a8514.jpg',
    },
    {
      name: 'snakes',
      image: 'https://i.pinimg.com/474x/38/4e/be/384ebef4540e73d32de8c0ce3f971d00.jpg',
    }, {
      name: 'cows',
      image: 'https://i.pinimg.com/474x/27/4e/91/274e9146be7867b5c02b41897121e31b.jpg',
    }, {
      name: 'pigs',
      image: 'https://i.pinimg.com/474x/a5/7d/9f/a57d9f2fbc10adc54f868323578cab1b.jpg',
    },
    {
      name: 'funny',
      image: 'https://i.pinimg.com/474x/a4/88/07/a488075bdba7111a1db9776e0afb4873.jpg',
    },
    {
      name: 'cute',
      image: 'https://i.pinimg.com/474x/3c/f5/7f/3cf57f087fc55f453b35f1eab5e35847.jpg',
    },
    {
      name: 'others',
      image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
  ];
  
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  
  export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
  };
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
  };
  
  export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };
  
  export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };