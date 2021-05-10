export const mentorService = {
    getMentorSlots
};

function getMentorSlots(mentorId) {
    const requestOptions = {
        method: 'GET'
    };

    const url = `https://private-anon-bbf1919dd4-cfcalendar.apiary-mock.com/mentors/${mentorId}/agenda`;

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            return response;
        });
}