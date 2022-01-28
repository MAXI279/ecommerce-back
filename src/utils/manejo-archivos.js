const fs = require('fs')

class Contenedor {
  constructor (url) {
    this.url = url
  }

  async getAll () {
    try {
      const data = await fs.promises.readFile(this.url, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      throw console.log(`Hubo un error: ${error}`)
    }
  }

  async getById (id) {
    const prod = await this.getAll()
    try {
      const element = prod.find(it => it.id === +id)
      if (element === undefined) {
        return null
      } else {
        return element
      }
    } catch (error) {
      console.log('No se encontro el elemento')
    }
  }

  async deleteAll () {
    const empty = ''
    await fs.promises.writeFile(this.url, empty, 'utf-8')
  }

  async deleteById (id) {
    const prod = await this.getAll()
    const prodSelec = prod.find(it => it.id === +id)
    if (prodSelec === undefined) {
      return null
    }
    const indexProdSelecc = prod.indexOf(prodSelec)
    prod.splice(indexProdSelecc, 1)
    const newJSON = JSON.stringify(prod)
    try {
      fs.promises.writeFile(this.url, newJSON)
      console.log(`Elemento con id:${prodSelec.id} fue eliminado, Archivo modificado`)
      return prodSelec.id
    } catch (error) {
      console.log('No se pudo eliminar el elemento', error)
    }
  }

  async save (obj) {
    const prod = await this.getAll()
    let newId
    if (prod.length === 0) {
      newId = 1
    } else {
      newId = prod.length + 1
    }
    const newObj = {
      ...obj,
      id: newId
    }
    prod.push(newObj)
    const newJSON = JSON.stringify(prod)
    try {
      await fs.promises.writeFile(this.url, newJSON)
      return newObj.id
    } catch (error) {
      console.log('No se pudo guardar el elemento', error)
    }
  }

  async update (obj, id) {
    const idEliminado = await this.deleteById(id)
    if (isNaN(idEliminado) || idEliminado === null) {
      return null
    }
    const prod = await this.getAll()
    const newObj = {
      ...obj,
      id: +id
    }
    prod.push(newObj)
    const newJSON = JSON.stringify(prod)
    try {
      await fs.promises.writeFile(this.url, newJSON)
      return newObj
    } catch (error) {
      console.log('No se pudo actualizar el elemento', error)
      return -1
    }
  }
}

module.exports = Contenedor
