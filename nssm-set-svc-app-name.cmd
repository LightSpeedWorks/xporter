@pushd %~dp0
@set HERE=%~dp0
@set SVC=XporterProxyServer
@set HOSTNAME=proxy
@set COMPUTERNAME=proxy
@set APP=%HERE%node %HERE%fnet-net %XPORTER_PROXY_FOLDER% 8080 %XPORTER_PROXY_EXTERNAL%
@set NSSM=nssm
@if "%PROCESSOR_ARCHITECTURE%" == "AMD64" set NSSM=nssm64
@popd
