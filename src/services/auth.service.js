export const exampleRequest = async (token) => {
  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}}`
    },
    body: JSON.stringify({
      // ...
    }),
  });

  if(response.ok){
    // Happy path
    return  /* DATA DE LA*/
  }

  return {} || []
}