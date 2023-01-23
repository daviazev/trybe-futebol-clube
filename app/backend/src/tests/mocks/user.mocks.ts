export const sucessUser = {
  dataValues: {
    id: 1,
    username: 'xablau',
    role: 'xablau',
    email: 'xablau@xablau.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
}

export const loginMock = {
  email: "teste@teste.com",
  password: "umaSenhaMuitoDifícil"
}

export const noEmailLoginMock = {
  password: "umaSenhaMuitoDifícil"
}

export const noPasswordLoginMock = {
  email: "teste@teste.com",
}

export const invalidEmail = {
  email: "teste@teste",
  password: "umaSenhaMuitoDifícil"
}

export const invalidPassword = {
  email: "teste@teste.com",
  password: "123"
}


// export const token = `eyJhbGciOiJIUzI1NiIsImV4cGlyZXNJbiI6IjdkIn0.eyJlbWFpbCI6InRlc3RlQHRlc3Rl
// LmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2Nzg5In0.61hI8wlp_dKXoKiT1bM-rTJ1YfwEClPP-uVrvmqAjdk`