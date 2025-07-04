import React from 'react'
import { useParams } from 'react-router'

const Space = () => {
const params=useParams<{spaceID:string}>()


  return (
    <div>{params.spaceID}</div>
  )
}

export default Space