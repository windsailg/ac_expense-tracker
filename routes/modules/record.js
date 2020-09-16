const express = require('express')
const router = express.Router()

const records = require('../../models/record')

// 搜尋篩選路由
router.get('/', (req, res) => {
  const queryArr = req.query
  if (!queryArr.sortRule) queryArr.sortRule = 'asc'
  if (queryArr.clear) queryArr.keyword = ''
  const word = queryArr.keyword.toLowerCase().trim()
  records.find()
    .lean()
    .sort({ name: queryArr.sortRule })
    .then(restaurant => {
      const categoryArr = []
      const areaArr = []
      restaurant.forEach(item => {
        categoryArr.push(item.category)
        areaArr.push(item.area)
      })
      const categories = categoryArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })
      const areas = areaArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })

      const searchedRestaurant = []
      restaurant.forEach(item => {
        if (item.name.toLowerCase().includes(word) || item.category.toLowerCase().includes(word)) {
          searchedRestaurant.push(item)
        }
      })

      const filteredRestaurant = []
      if (queryArr.filterCategory) {
        searchedRestaurant.forEach(item => {
          if (item.category.includes(queryArr.filterCategory)) {
            filteredRestaurant.push(item)
          }
        })
        searchedRestaurant.length = 0
        filteredRestaurant.forEach(ele => {
          searchedRestaurant.push(ele)
        })
      } else if (queryArr.filterArea) {
        searchedRestaurant.forEach(item => {
          if (item.area.includes(queryArr.filterArea)) {
            filteredRestaurant.push(item)
          }
        })
        searchedRestaurant.length = 0
        filteredRestaurant.forEach(ele => {
          searchedRestaurant.push(ele)
        })
      }

      return res.render('index', {
        restaurant: searchedRestaurant,
        keywords: word,
        categories,
        areas,
        queryArr
      })
    })
    .catch(error => console.error(error))
})

// 新增頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增頁面送出路由
router.post('/', (req, res) => {
  const { name, name_en, category, rating, area, location, google_map, phone, description, image } = req.body
  return records.create({
    name: name,
    name_en: name_en,
    category: category,
    rating: rating,
    area: area,
    location: location,
    google_map: google_map,
    phone: phone,
    description: description,
    image: image
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 詳細頁面路由
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// 編輯頁面路由
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯頁面送出路由
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const { name, name_en, category, rating, area, location, google_map, phone, description, image } = req.body
  console.log(req.body)
  return records.findById(id)
    .then(record => {
      record.name = name
      return record.save()
    })
    .then(() => {
      return res.redirect(`/restaurant/${id}`)
    })
    .catch(error => console.error(error))
})

// 刪除物件送出路由
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return records.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
