import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const server = 'https://api.github.com/'
const api = chai.request(server)

export const TOKEN = ''
export const USER = ''
export const REPO = ''

export async function create(body) {
    return api
        .post(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .send(body)
}

export async function list() {
    return api
        .get(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
}

export async function remove(id) {
    return api
        .delete(`repos/${USER}/${REPO}/releases/${id}`)
        .set('Authorization', 'Bearer ' + TOKEN)
}

before(async function() {
    const testDuplicatedRelease = {
        'tag_name': 'v1.0.0',
        'target_commitish': 'master',
        'name': 'v1.0.0',
        'body': 'Creates a release through the API',
        'draft': false,
        'prerelease': false
    }

    const testListReleaseById = {
        'tag_name': 'v1.0.2',
        'target_commitish': 'master',
        'name': 'v1.0.0',
        'body': 'Creates a release through the API',
        'draft': false,
        'prerelease': false
    }

    create(testDuplicatedRelease)
    create(testListReleaseById)

    const body = await list()
    const releases = JSON.parse(body.text)

    if (releases) {
        for (const release of releases) {

            await remove(release.id)
        }
    }
})

after(async function() {
    const body = await list()
    const releases = JSON.parse(body.text)

    if (releases) {
        for (const release of releases) {

            await remove(release.id)
        }
    }
})
