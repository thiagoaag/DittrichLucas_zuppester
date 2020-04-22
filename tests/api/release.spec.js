import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSubset from 'chai-subset'
import { create, TOKEN, USER, REPO } from '../support/hooks.js'

chai.use(chaiHttp)
chai.use(chaiSubset)

const server = 'https://api.github.com/'
const api = chai.request(server)
const expect = chai.expect

describe('Create', function() {
    const body = {
        'tag_name': 'v1.0.1',
        'target_commitish': 'master',
        'name': 'v1.0.0',
        'body': 'Creates a release through the API',
        'draft': false,
        'prerelease': false
    }

    const bodyEmptyTagName = {
        'tag_name': '',
        'target_commitish': 'master',
        'name': 'v1.0.0',
        'body': 'Creates a release through the API',
        'draft': false,
        'prerelease': false
    }

    const bodyWithoutTagName = {
        'target_commitish': 'master',
        'name': 'v1.0.0',
        'body': 'Creates a release through the API',
        'draft': false,
        'prerelease': false
    }

    const messageErrorDuplicateRelease = {
        'message': 'Validation Failed',
        'errors': [
            {
                'resource': 'Release',
                'code': 'already_exists',
                'field': 'tag_name'
            }
        ],
        'documentation_url': 'https://developer.github.com/v3/repos/releases/#create-a-release'
    }

    const messageErrorInvalidTagName = {
        'errors': [{
            'resource': 'Release',
            'code': 'custom',
            'field': 'tag_name',
            'message': 'tag_name is not well-formed'
        }]
    }

    it('should create a release', function(done) {
        api
        .post(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .send(body)
        .end(function(err, res) {
            const responseBody = res.body

            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(responseBody).to.have.property('id').that.is.a('number')
            expect(responseBody).to.containSubset(body)

            done()
        })
    })

    it('should throw an error when the release already exists', function(done) {
        api
        .post(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .send(body)
        .end(function(err, res) {
            const responseBody = res.body

            expect(err).to.be.null
            expect(res).to.have.status(422)
            expect(responseBody).to.containSubset(messageErrorDuplicateRelease)

            done()
        })
    })

    it('should throw an error on create a release with empty tag name', function(done) {
        api
        .post(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .send(bodyEmptyTagName)
        .end(function(err, res) {
            const responseBody = res.body

            expect(err).to.be.null
            expect(res).to.have.status(422)
            expect(responseBody).to.containSubset(messageErrorInvalidTagName)

            done()
        })
    })

    it('should throw an error on create a release without tag name', function(done) {
        api
        .post(`repos/${USER}/${REPO}/releases`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .send(bodyWithoutTagName)
        .end(function(err, res) {
            const { message } = res.body

            expect(err).to.be.null
            expect(res).to.have.status(422)
            expect(message).to.be.equal(`Invalid request.\n\n"tag_name" wasn't supplied.`)

            done()
        })
    })
})

describe('List', function() {
    describe('List releases from a repository', function() {
        it('should list all releases from a repository', function(done) {
            api
            .get(`repos/${USER}/${REPO}/releases`)
            .set('Authorization', 'Bearer ' + TOKEN)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)

                done()
            })
        })
    })

    describe('List release by id', function() {
        it('should list a release by id', async function() {
            const body = {
                'tag_name': 'v1.0.4',
                'target_commitish': 'master',
                'name': 'v1.0.4',
                'body': 'Creates a release through the API',
                'draft': false,
                'prerelease': false
            }

            const release = await create(body)
            const { id } = JSON.parse(release.text)

            api
            .get(`repos/${USER}/${REPO}/releases/${id}`)
            .set('Authorization', 'Bearer ' + TOKEN)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
            })
        })

        it('should throw an error when listing a non-existing release', function(done) {
            api
            .get(`repos/${USER}/${REPO}/releases/23456678`)
            .set('Authorization', 'Bearer ' + TOKEN)
            .end(function(err, res) {
                const body = res.body
                const messageNotFound = {
                    'message': 'Not Found',
                    'documentation_url': 'https://developer.github.com/v3/repos/releases/#get-a-single-release'
                }

                expect(err).to.be.null
                expect(res).to.have.status(404)
                expect(body).to.containSubset(messageNotFound)

                done()
            })
        })

    })

    describe('List the latest release', function() {
        it('should list the latest release from a repository', function(done) {
            api
            .get(`repos/${USER}/${REPO}/releases/latest`)
            .set('Authorization', 'Bearer ' + TOKEN)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)

                done()
            })
        })
    })
})

describe('Delete', function () {
    it('should delete a release from a repository', async () => {
        const body = {
            'tag_name': 'v1.0.3',
            'target_commitish': 'master',
            'name': 'v1.0.3',
            'body': 'Creates a release through the API',
            'draft': false,
            'prerelease': false
        }

        const release = await create(body)
        const { id } = JSON.parse(release.text)

        api
        .delete(`repos/${USER}/${REPO}/releases/${id}`)
        .set('Authorization', 'Bearer ' + TOKEN)
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(204)
        })
    })

    it('should throw an error when deleting a non-existing release', function() {
        api
        .delete('repos/${USER}/${REPO}/releases/23456')
        .set('Authorization', 'Bearer ' + TOKEN)
        .end(function(err, res) {
            const body = res.body
            const messageNotFound = {
                'message': 'Not Found',
                'documentation_url': 'https://developer.github.com/v3/repos/releases/#delete-a-release'
            }

            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(body).to.containSubset(messageNotFound)
        })
    })

})
