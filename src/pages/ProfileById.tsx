import { RequireAuth } from "@/components/shared/require-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfessionalById } from "@/lib/services/professionals-service";
import { getInitialsOrFallback } from "@/lib/utils";
import {
  BriefcaseBusiness,
  ExternalLink,
  Link,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import linkedinIcon from "@/assets/linkedin.svg";

export default function ProfileById() {
  const { id } = useParams<{ id: string }>();
  const professional = useMemo(() => getProfessionalById(id), [id]);

  if (!professional) {
    return (
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex min-h-full w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100">
              <UserRound className="size-7 text-blue-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Perfil não encontrado
            </h1>
            <p className="text-sm text-gray-500">
              Não foi possível encontrar o profissional informado.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <RequireAuth>
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
          <section className="flex flex-col justify-end overflow-hidden rounded-xl border bg-white shadow-sm md:h-60 h-80">
            <div className="flex-1 w-full bg-linear-to-r from-gray-100 via-gray-50 to-gray-100" />
            <div className="w-full px-5 pb-6 md:px-8">
              <div className="w-full -mt-12 flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
                  <Avatar className="size-32 shrink-0 mb-3 shadow-sm border-4 border-white">
                    <AvatarImage src={professional.picture} />
                    <AvatarFallback className="bg-gray-200 text-gray-500 text-5xl font-semibold">
                      {getInitialsOrFallback(professional.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="pb-0 sm:pb-5 flex flex-col items-center md:items-start">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                      {professional.name}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-600 md:text-base">
                      {professional.title}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="size-4" />
                      <span>
                        {professional.city}, {professional.uf}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="space-y-5 order-2 lg:col-span-2 lg:order-1">
              <section className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3 select-none">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-gray-100">
                    <BriefcaseBusiness className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Sobre o profissional
                    </h2>
                    <p className="text-xs text-gray-500">
                      Informações profissionais
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {professional.chunks?.map((chunk, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-gray-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-gray-500 select-none">
                          Chunk {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-7">
                        {chunk.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <aside className="order-1 lg:order-2 space-y-5">
              <section className="rounded-xl border bg-white p-5 shadow-sm select-none">
                <h2 className="mb-4 font-semibold text-gray-900">Contato</h2>
                <div className="space-y-4">
                  <a
                    className="flex gap-3 items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                    draggable="false"
                    href={`mailto:${professional.email}`}
                  >
                    <Mail className="mt-0.5 size-4" />
                    <span className="break-all">{professional.email}</span>
                  </a>
                  {professional.phone && (
                    <a
                      className="flex gap-3 items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                      draggable="false"
                      href={`tel:${professional.phone}`}
                    >
                      <Phone className="mt-0.5 size-4" />
                      <span className="break-all">{professional.phone}</span>
                    </a>
                  )}
                  <a
                    className="flex gap-3 items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable="false"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${professional.city}, ${professional.uf}`)}`}
                  >
                    <MapPin className="mt-0.5 size-4" />
                    <span className="break-all">
                      {professional.city}, {professional.uf}
                    </span>
                  </a>
                </div>
              </section>
              {(professional.linkedin || professional.portfolio) && (
                <section className="rounded-xl border bg-white p-5 shadow-sm select-none">
                  <h2 className="mb-4 font-semibold text-gray-900">
                    Links profissionais
                  </h2>
                  <div className="space-y-2">
                    {professional.linkedin && (
                      <a
                        href={professional.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable="false"
                        className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2 text-gray-900 transition-colors hover:text-gray-600">
                          <img
                            className="h-4"
                            src={linkedinIcon}
                            alt="LinkedIn"
                          />
                          LinkedIn
                        </span>
                        <ExternalLink className="size-3.5 text-gray-400" />
                      </a>
                    )}
                    {professional.portfolio && (
                      <a
                        href={professional.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable="false"
                        className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2 text-gray-900 transition-colors hover:text-gray-600">
                          <Link className="size-4" />
                          Website
                        </span>
                        <ExternalLink className="size-3.5 text-gray-400" />
                      </a>
                    )}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
