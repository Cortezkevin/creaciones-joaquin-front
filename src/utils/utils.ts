export const formatDate = (dateString: string) => {
  const date = new Date( dateString );
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
}