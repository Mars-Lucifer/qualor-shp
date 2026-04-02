export function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 xl:px-[60px] pb-16 sm:pb-20">
      <div className="max-w-[1320px] mx-auto">
        <div className="h-0.5 bg-[#F5F5F5] w-full mb-8 sm:mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Social */}
          <div className="flex flex-col gap-5">
            <p className="text-[#1F2128] text-2xl font-medium leading-[1.08]">Соц сети</p>
            <div className="flex items-center gap-3.5">
              <a
                href="https://t.me/qship"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 transition-transform duration-150 hover:scale-110 active:scale-95"
                aria-label="Telegram"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="18" fill="#2AABEE" />
                  <path
                    d="M25.7 11.3L22.3 26.2C22.1 26.9 21.6 27.1 21 26.7L16.5 23.4L14.3 25.5C14.1 25.7 13.9 25.8 13.5 25.8L13.8 21.2L21.8 13.9C22.1 13.7 21.8 13.5 21.4 13.8L11.5 20.1L7.1 18.7C6.1 18.4 6.1 17.7 7.3 17.2L24.4 10.5C25.3 10.1 26.1 10.7 25.7 11.3Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://vk.com/qship"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 transition-transform duration-150 hover:scale-110 active:scale-95"
                aria-label="VK"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="18" fill="#0077FF" />
                  <path
                    d="M19.08 24C13.4 24 10.16 20.12 10 13.6H12.92C13.04 18.4 15.16 20.44 16.84 20.88V13.6H19.6V17.76C21.24 17.6 22.96 15.68 23.52 13.6H26.28C25.84 16.16 23.96 18.08 22.6 18.84C23.96 19.44 26.12 21.12 26.96 24H23.92C23.24 21.96 21.64 20.4 19.6 20.2V24H19.08Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-5">
            <p className="text-[#1F2128] text-2xl font-medium leading-[1.08]">Контакты</p>
            <div className="flex flex-col gap-5">
              <a
                href="tel:88005553535"
                className="text-[#7E8395] text-base font-medium no-underline hover:text-[#1F2128] transition-colors duration-150"
              >
                8 800 555-35-35
              </a>
              <a
                href="mailto:help@qship.ru"
                className="text-[#7E8395] text-base font-medium no-underline hover:text-[#1F2128] transition-colors duration-150"
              >
                help@qship.ru
              </a>
              <a
                href="https://t.me/qship"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 no-underline hover:opacity-75 transition-opacity duration-150"
              >
                <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="18" fill="#2AABEE" />
                  <path
                    d="M25.7 11.3L22.3 26.2C22.1 26.9 21.6 27.1 21 26.7L16.5 23.4L14.3 25.5C14.1 25.7 13.9 25.8 13.5 25.8L13.8 21.2L21.8 13.9C22.1 13.7 21.8 13.5 21.4 13.8L11.5 20.1L7.1 18.7C6.1 18.4 6.1 17.7 7.3 17.2L24.4 10.5C25.3 10.1 26.1 10.7 25.7 11.3Z"
                    fill="white"
                  />
                </svg>
                <span className="text-[#7E8395] text-base font-medium">@qship</span>
              </a>
            </div>
          </div>

          {/* Documents */}
          <div className="flex flex-col gap-5">
            <p className="text-[#1F2128] text-2xl font-medium leading-[1.08]">Документы</p>
            <div className="flex flex-col gap-5">
              {[
                'Пользовательское соглашение',
                'Политика конфиденциальности',
                'Публичная оферта',
                'Политика использования Cookie',
              ].map((doc) => (
                <a
                  key={doc}
                  href="#"
                  className="text-[#7E8395] text-base font-medium no-underline hover:text-[#1F2128] transition-colors duration-150"
                >
                  {doc}
                </a>
              ))}
            </div>
          </div>

          {/* Company data */}
          <div className="flex flex-col gap-5">
            <p className="text-[#1F2128] text-2xl font-medium leading-[1.08]">Данные</p>
            <div className="flex flex-col gap-5">
              <p className="text-[#7E8395] text-base font-medium">ИНН: 123456789</p>
              <p className="text-[#7E8395] text-base font-medium">ООО "TechMarket"</p>
              <p className="text-[#7E8395] text-base font-medium">
                Город Тоски, улица грусти, переулок отчаяния, дом 13
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
