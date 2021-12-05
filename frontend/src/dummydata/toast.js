import {Warning,Check,Info,Error} from '../components/common/icons'

const showToast = (type, title, description) => {
  const id = Math.floor((Math.random() * 101) + 1);
  switch(type) {
    case 'success':
      return {
        id,
        title: title,
        description: description,
        backgroundColor: '#5cb85c',
        icon: Check
      }
    case 'danger':
      return {
        id,
        title: title,
        description: description,
        backgroundColor: '#d9534f',
        icon: Error
      }
    case 'info':
      return {
        id,
        title: title,
        description: description,
        backgroundColor: '#5bc0de',
        icon: Info
      }
    case 'warning':
      return {
        id,
        title: title,
        description: description,
        backgroundColor: '#f0ad4e',
        icon: Warning
      }
      default: return {}
  }
}

export default showToast;