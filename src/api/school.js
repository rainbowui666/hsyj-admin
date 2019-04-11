import axios from '@/libs/api.request'

export const addSchool = (obj) => {
  const data = {
    'schoolname': obj.schoolname,
    'province': obj.province,
    'city': obj.city, // 所属区县
    'address': obj.address,
    'schooldesc': obj.schooldesc,
    'sourceaddress': obj.sourceaddress,
    'longitude': obj.longitude, // 经度
    'latitude': obj.latitude, // 纬度
    'soundurl': obj.soundurl,
    'videourl': obj.videourl,
    'areaid': obj.areaid,
    'parentid': obj.parentid // 本条是分校区

  }

  return axios.request({
    url: 'school/addEdit',
    data,
    method: 'post'
  })
}

export const getSchoolList = () => {
  return axios.request({
    url: 'school/index?page=1&size=5',
    method: 'get'
  })
}